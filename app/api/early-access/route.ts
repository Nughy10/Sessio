import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    // DEBUG: Loguea las variables
    console.log('DEBUG: SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('DEBUG: SUPABASE_KEY:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

    // Validación
    if (!email || !name) {
      return Response.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      );
    }

    // Verificar que las variables existen
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('ERROR: SUPABASE_URL is undefined');
      return Response.json(
        { error: 'Server configuration error: SUPABASE_URL missing' },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      console.error('ERROR: SUPABASE_KEY is undefined');
      return Response.json(
        { error: 'Server configuration error: SUPABASE_KEY missing' },
        { status: 500 }
      );
    }

    console.log('DEBUG: Creating Supabase client...');

    // Crear cliente Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    );

    console.log('DEBUG: Supabase client created, attempting insert...');

    // Guardar en Supabase
    const { error, data } = await supabase
      .from('early_access_waitlist')
      .insert([{ email, name, created_at: new Date() }]);

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: 'Error al guardar en base de datos' },
        { status: 500 }
      );
    }

    console.log('DEBUG: Insert successful, data:', data);

    return Response.json(
      { success: true, message: 'Registrado exitosamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Catch error:', error);
    return Response.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}