import { nanoid } from "nanoid";
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
console.log("import.meta.url=",import.meta.url);
console.log("__filename=",__filename);

const __dirname = dirname(__filename);
console.log("__dirname=",__dirname)

const pathWithoutBuild = __dirname.replace(/\/build$/, '');
console.log("pathWithoutBuild=",pathWithoutBuild)

const notesPath = path.resolve(pathWithoutBuild, 'notes.json');
console.log("notesPath=",notesPath)

const readNotes = () => {
  try {
    const data = fs.readFileSync(notesPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read notes.json:', err);
    return { notes: [] };
  }
};

const writeNotes = (notes) => {
  try {
    fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
    console.log('Successfully wrote to notes.json');
  } catch (err) {
    console.error('Failed to write notes.json:', err);
    throw err;
  }
};

const postNote = (req, res) => {
  if (!req.payload || !req.payload.title || !req.payload.tags || !req.payload.body) {
    const response = res.response({
      status: 'fail',
      message: 'title, tags, atau body kosong',
      data: null,
    });
    response.code(400);
    return response;
  }

  const { title, tags, body } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  let notes = readNotes();
  notes.notes.push(newNote);
  console.log("after push: notes=", notes);

  const isSuccess = notes.notes.some((note) => note.id === id);

  if (isSuccess) {
    try {
      writeNotes(notes);

      const response = res.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          id,
        },
      });
      response.code(201);
      return response;
    } catch (err) {
      const response = res.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
    }
  }

  const response = res.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};




const getAllNotesHandler = () => {
  const notes = readNotes();

  return {
    status: 'success',
    data: {
      notes: notes.notes,
    },
  }
};


const getNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  console.log("id=",id)
  const notes = readNotes();
 
  const note = notes.notes.filter((n) => n.id === id)[0];
 
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
 
  const response = res.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};




const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const notes = readNotes();
 
  const index = notes.notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes.notes[index] = {
      ...notes.notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    try {
      writeNotes(notes);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
    }

  }
 
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const notes = readNotes();
  const index = notes.notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.notes.splice(index, 1)
    console.log("filtered notes:",notes.notes)

    try {
      writeNotes(notes);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
    }

  }
 
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};


export {postNote,getAllNotesHandler,getNoteByIdHandler,editNoteByIdHandler,deleteNoteByIdHandler}
