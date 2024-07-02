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
        val newUser = UsuarioDAO.new {
            nome = usuario.nome
            email = usuario.email
            senha = usuario.senha
        }
        daoToModel(newUser)
    }

    override suspend fun getUsuarioById(id: Int): Usuario? = suspendTransaction {
        UsuarioDAO.findById(id)?.let { daoToModel(it) }
    }

    override suspend fun getIdByUsuarioEmail(email: String): Int? = suspendTransaction {
        UsuarioTable
            .select { UsuarioTable.email eq email }
            .mapNotNull { it[UsuarioTable.id].value }
            .singleOrNull()
    }

    override suspend fun getSenhaByUsuarioEmail(email : String ): String? = suspendTransaction {
        UsuarioTable.select{ (UsuarioTable.email eq email) }
            .mapNotNull { it[UsuarioTable.senha]}
            .singleOrNull()
    }

    override suspend fun getUsuario(token: String): Usuario? = suspendTransaction {
        UsuarioDAO
            .find { UsuarioTable.id eq token.toInt() }
            .limit(1)
            .map(::daoToModel)
            .firstOrNull()
    }
}