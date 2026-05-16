// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://ioizafykiofcaisutehr.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvaXphZnlraW9mY2Fpc3V0ZWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MjMwMjEsImV4cCI6MjA5MzQ5OTAyMX0.TTINrfwDPYrz1JcP7nd05L35v32PhRhqj-VSgrkQC2Q';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: true
//   }
// });

// // Función para crear perfil automáticamente
// export const ensureProfile = async (user) => {
//   try {
//     // Verificar si el perfil existe
//     const { data: existingProfile, error: fetchError } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', user.id)
//       .single();
    
//     if (fetchError && fetchError.code === 'PGRST116') {
//       // Perfil no existe, crearlo
//       const { data: newProfile, error: insertError } = await supabase
//         .from('profiles')
//         .insert([
//           {
//             id: user.id,
//             email: user.email,
//             full_name: user.user_metadata?.full_name || user.email,
//             created_at: new Date().toISOString(),
//             updated_at: new Date().toISOString()
//           }
//         ])
//         .select()
//         .single();
      
//       if (insertError) throw insertError;
      
//       // Crear lista por defecto
//       await supabase
//         .from('lists')
//         .insert([
//           {
//             user_id: user.id,
//             name: 'Personal',
//             balance: 0,
//             icon: '👤'
//           }
//         ]);
      
//       return newProfile;
//     }
    
//     return existingProfile;
//   } catch (error) {
//     console.error('Error ensuring profile:', error);
//     return null;
//   }
// };

// export const getCurrentUser = async () => {
//   const { data: { user }, error } = await supabase.auth.getUser();
//   if (error) throw error;
//   return user;
// };

// export const getUserProfile = async (userId) => {
//   const { data, error } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', userId)
//     .single();
  
//   if (error && error.code !== 'PGRST116') throw error;
//   return data;
// };

// export const upsertProfile = async (profile) => {
//   const { data, error } = await supabase
//     .from('profiles')
//     .upsert(profile, { onConflict: 'id' })
//     .select()
//     .single();
  
//   if (error) throw error;
//   return data;
// };
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://ioizafykiofcaisutehr.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvaXphZnlraW9mY2Fpc3V0ZWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MjMwMjEsImV4cCI6MjA5MzQ5OTAyMX0.TTINrfwDPYrz1JcP7nd05L35v32PhRhqj-VSgrkQC2Q';

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