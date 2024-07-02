package com.iridium.models

import Usuario

interface UsuarioRepository {
    suspend fun addUsuario(usuario : Usuario)
    suspend fun getUsuarioById(id: Int): Usuario?
    suspend fun getIdByUsuarioEmail(email: String): Int?
    suspend fun getSenhaByUsuarioEmail(email : String ): String?
    suspend fun getUsuario(token: String): Usuario?
}
