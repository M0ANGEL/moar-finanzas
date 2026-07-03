import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Función para crear perfil automáticamente
export const ensureProfile = async (user) => {
  try {
    // Verificar si el perfil existe
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (fetchError && fetchError.code === 'PGRST116') {
      // Perfil no existe, crearlo con los datos del registro
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email,
            phone: user.user_metadata?.phone || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);
      
      if (insertError) throw insertError;
      
      // Crear lista por defecto
      await supabase
        .from('lists')
        .insert([
          {
            user_id: user.id,
            name: 'Personal',
            balance: 0,
            icon: '👤'
          }
        ]);
      
      console.log('✅ Perfil y lista creados para:', user.email);
      return true;
    }
    
    return existingProfile;
  } catch (error) {
    console.error('Error ensuring profile:', error);
    return null;
  }
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};