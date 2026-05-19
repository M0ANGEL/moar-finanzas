import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://himwbkbjobphjekojomf.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbXdia2Jqb2JwaGpla29qb21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4ODk3MTYsImV4cCI6MjA5NDQ2NTcxNn0.hNRMUOXQiJ5yaJnkcR7A36AOlefoeRIOtZS6CWPbsmQ';

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