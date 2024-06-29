import kotlinx.serialization.Serializable

@Serializable
data class Disciplina(
    var name: String,
    var docente: String,
    var sigla: String,
    var apelido: String
)