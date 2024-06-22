package com.iridium.responses

import kotlinx.serialization.Serializable
import java.util.*

@Serializable
class DisciplinaResponse(
    val id: String,
    val nome: String,
    val sigla: String,
    val docente: String,
    val apelido: String,
    val emAndamento: String
)