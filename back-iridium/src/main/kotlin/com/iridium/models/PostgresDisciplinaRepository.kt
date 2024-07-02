class PostgresDisciplinaRepository : DisciplinaRepository {

    override suspend fun allDisciplinas(token: String): List<Disciplina> = suspendTransaction {
        DisciplinaDAO.find { DisciplinaTable.token eq token }
            .map(::daoToModel)
    }

    override suspend fun disciplinasByAndamento(andamento: Boolean, token: String): List<Disciplina> = suspendTransaction {
        DisciplinaDAO.find { (DisciplinaTable.andamento eq andamento) and (DisciplinaTable.token eq token) }
            .map(::daoToModel)
    }

    override suspend fun disciplinaByName(name: String, token: String): Disciplina? = suspendTransaction {
        DisciplinaDAO.find { (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }
            .limit(1)
            .map(::daoToModel)
            .firstOrNull()
    }

    override suspend fun addDisciplina(disciplina: Disciplina, token: String): Unit = suspendTransaction {
        DisciplinaDAO.new {
            name = disciplina.name
            docente = disciplina.docente
            sigla = disciplina.sigla
            apelido = disciplina.apelido
            this.token = token // Assuming the token is a field in DisciplinaDAO
        }
    }

    override suspend fun removeDisciplina(name: String, token: String): Boolean = suspendTransaction {
        val rowsDeleted = DisciplinaTable.deleteWhere {
            (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token)
        }
        rowsDeleted == 1
    }

    override suspend fun switchDisciplinaAndamento(name: String, andamento: Boolean, token: String): Boolean = suspendTransaction {
        val disciplina = DisciplinaTable.select { (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }.singleOrNull()
        if (disciplina != null) {
            val rowsUpdated = DisciplinaTable.update({ (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }) {
                it[DisciplinaTable.andamento] = andamento
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchDisciplinaSigla(name: String, sigla: String, token: String): Boolean = suspendTransaction {
        val disciplina = DisciplinaTable.select { (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }.singleOrNull()
        if (disciplina != null) {
            val rowsUpdated = DisciplinaTable.update({ (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }) {
                it[DisciplinaTable.sigla] = sigla
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchDisciplinaDocente(name: String, docente: String, token: String): Boolean = suspendTransaction {
        val disciplina = DisciplinaTable.select { (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }.singleOrNull()
        if (disciplina != null) {
            val rowsUpdated = DisciplinaTable.update({ (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }) {
                it[DisciplinaTable.docente] = docente
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchDisciplinaApelido(name: String, apelido: String, token: String): Boolean = suspendTransaction {
        val disciplina = DisciplinaTable.select { (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }.singleOrNull()
        if (disciplina != null) {
            val rowsUpdated = DisciplinaTable.update({ (DisciplinaTable.name eq name) and (DisciplinaTable.token eq token) }) {
                it[DisciplinaTable.apelido] = apelido
            }
            rowsUpdated == 1
        } else {
            false
        }
    }
}
