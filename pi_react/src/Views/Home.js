import { useState } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl="https://clnjakvlqdtyfgcoapci.supabase.co";
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbmpha3ZscWR0eWZnY29hcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAzNzEsImV4cCI6MjA2OTkyNjM3MX0.7g7VvxI1DnM0kgvdcoYW2qc_8sdAdyyCfsQyXkebPeQ";

const supabase = createClient(supabaseUrl, supabaseKey);

function Home() {
  
  const [msg, setMsg] = useState("");

  return (
    <main className="App">
      

      {msg && (<div className='toast'>{msg}</div>)}  
    </main>
  );
}

export default Home;