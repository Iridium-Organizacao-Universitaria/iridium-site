import kotlinx.serialization.Serializable

@Serializable
data class Usuario(
    val id: Int? = null,
    var nome: String,
    var email: String,
    var senha: String,
)