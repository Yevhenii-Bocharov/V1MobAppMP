import { supabase } from "./supabase";

// 1. Get all students

export const getStudents = async () => {
  const { data, error } = await supabase
    .from("Students")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw error;
  return data;
};

// 2. Get classes for a specific student

export const getStudentClasses = async (studentId: number) => {
  const { data, error } = await supabase
    .from("Classes")
    .select("*")
    .eq("student_id", studentId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

// 3. Add a new class note

// 3. Add a new class note
export const addClassNote = async (
  studentId: number,
  instructor: string,
  note: string,
) => {
  const { data, error } = await supabase
    .from("Classes")
    .insert([
      {
        student_id: studentId,
        instructor_name: instructor, // <-- DOUBLE CHECK THIS NAME IN SUPABASE
        comments: note,
        date: new Date().toISOString(),
      },
    ])
    .select(); // Added .select() to ensure data is returned and confirmed

  if (error) {
    console.error("Supabase Error in addClassNote:", error.message);
    throw error;
  }
  return data;
};

// Log in a user with email and password

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

export const deleteStudent = async (studentId: number) => {
  const { data, error } = await supabase
    .from("Students")
    .delete() // Tell it what to do
    .eq("id", studentId); // Tell it exactly which one to do it to

  if (error) {
    console.error("Delete Error:", error.message);
    throw error;
  }
  return data;
};

export const getStudentById = async (studentId: number) => {
  const { data, error } = await supabase
    .from("Students")
    .select(
      `
      *,
      Classes (*) 
    `,
    ) // This is the "Join". It looks for the foreign key link automatically.
    .eq("id", studentId)
    .single();

  if (error) {
    console.error("Error fetching student info:", error.message);
    throw error;
  }
  return data;
};

export const getClassById = async (classId: number) => {
  const { data, error } = await supabase
    .from("Classes")
    .select("*")
    .eq("id", classId)
    .single();

  if (error) {
    console.error("Error fetching class info:", error.message);
    throw error;
  }
  return data;
};

export const updateClassById = async (
  classId: number,
  instructor: string,
  note: string,
) => {
  const { data, error } = await supabase
    .from("Classes")
    .update({
      instructor_name: instructor,
      comments: note,
      // You can add 'date: new Date().toISOString()' here
      // if you want the "Edited" time to show up.
    })
    .eq("id", classId)
    .select(); // Optional: returns the updated row data

  if (error) {
    console.error("Update Error:", error.message);
    throw error;
  }
  return data;
};

export const deleteClassById = async (classId: number) => {
  const { error } = await supabase.from("Classes").delete().eq("id", classId);

  if (error) {
    console.error("Delete Class Error:", error.message);
    throw error;
  }
};
