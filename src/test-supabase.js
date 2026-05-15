import { supabase } from './lib/supabase';

export const testConnection = async () => {
  try {
    // Probar conexión
    const { data, error } = await supabase.from('lists').select('count');
    
    if (error) {
      console.error('Error de conexión:', error);
      return false;
    }
    
    console.log('✅ Conexión exitosa a Supabase');
    return true;
  } catch (err) {
    console.error('❌ Error:', err);
    return false;
  }
};