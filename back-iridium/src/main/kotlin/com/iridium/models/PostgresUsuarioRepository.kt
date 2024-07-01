package com.iridium.models

import Usuario

import com.iridium.db.UsuarioDAO
import com.iridium.db.UsuarioTable
import com.iridium.db.daoToModel
import com.iridium.db.suspendTransaction
import java.sql.Date

import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
//import org.jetbrains.exposed.sql.transactions.experimental.suspendTransaction
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.*

class PostgresUsuarioRepository : UsuarioRepository {
    //suspend fun

    override suspend fun addUsuario(usuario : Usuario): Unit = suspendTransaction {
        UsuarioDAO.new {
            nome = usuario.nome
            email = usuario.email
            senha = usuario.senha
        }
    }

//    suspend fun saveSenha(password: Password): Boolean = suspendTransaction { }
//    suspend fun saveName(name: String): Boolean = suspendTransaction { }
//    suspend fun saveEmail(email : String): Boolean = suspendTransaction { }

//    suspend fun switchSenha(password: Password, userID : Int): Boolean = suspendTransaction { }
//    suspend fun switchName(name: String, userID : Int): Boolean = suspendTransaction { }
//    suspend fun switchEmail(email : String, userID : Int): Boolean = suspendTransaction { }
}