import kotlinx.serialization.Serializable

@Serializable
data class Usuario(
    var nome: String,
    var email: String,
    var senha: String,
)