package com.iridium.models

import Usuario

interface UsuarioRepository {
    suspend fun addUsuario(usuario : Usuario)
    suspend fun getUsuarioById(id: Int): Usuario?
    suspend fun getIdByUsuarioEmail(email: String): Int?
    suspend fun getSenhaByUsuarioEmail(email : String ): String?

//    suspend fun switchSenha(password: Password, userID : Int): Boolean
//    suspend fun switchName(name: String, userID : Int): Boolean
//    suspend fun switchEmail(email : String, userID : Int): Boolean

//    suspend fun allDisciplinas(): List<Disciplina>
//    suspend fun disciplinaByName(name: String): Disciplina?
//    suspend fun disciplinasByAndamento(andamento: Boolean): List<Disciplina>
//    suspend fun switchDisciplinaAndamento(name: String, andamento: Boolean ): Boolean
//    suspend fun addDisciplina(disciplina: Disciplina)
//    suspend fun removeDisciplina(name: String): Boolean
//    suspend fun switchDisciplinaSigla(name: String, sigla: String): Boolean
//    suspend fun switchDisciplinaDocente(name: String, docente: String): Boolean
//    suspend fun switchDisciplinaApelido(name: String, apelido: String): Boolean
}
