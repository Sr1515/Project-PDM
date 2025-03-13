import Z from 'zod'

export const loginSchema = Z.object({
    email: Z
        .string()
        .email("Formato de e-mail inválido")
        .nonempty("Email é obrigatório"),

    password: Z
        .string()
        .min(6, "A senha deve ter no minimo 6 caracteres")
        .nonempty("A senha é obrigatória")
});

export const signUpSchema = Z.object({
    name: Z
        .string()
        .nonempty("Nome completo é obrigatório"),

    email: Z
        .string()
        .email("Formato de e-mail inválido")
        .nonempty("Email é obrigatório"),

    password: Z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .nonempty("A senha é obrigatória"),
});

export const addProductSchema = Z.object({
    productName: Z
        .string()
        .nonempty("Nome do produto é obrigatório"),

    manufactureDate: Z
        .string()
        .regex(
            /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            "Data de fabricação inválida. Use o formato dd/mm/aaaa"
        )
        .nonempty("Data de fabricação é obrigatória"),

    expiryDate: Z
        .string()
        .regex(
            /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            "Data de validade inválida. Use o formato dd/mm/aaaa"
        )
        .nonempty("Data de validade é obrigatória"),

    productType: Z
        .string()
        .nonempty("Tipo do produto é obrigatório"),

    quantity: Z
        .string()
        .regex(/^\d+$/, "A quantidade deve ser um número")
        .nonempty("Quantidade é obrigatória"),

    value: Z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "O valor deve ser um número válido, por exemplo: 10.50")
        .nonempty("Valor é obrigatório"),

    description: Z
        .string()
        .nonempty("Descrição é obrigatória"),
});

export const addClientSchema = Z.object({
    name: Z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .nonempty("Nome é obrigatório"),

    email: Z
        .string()
        .email("O e-mail precisa ser válido")
        .nonempty("E-mail é obrigatório"),

    contato: Z
        .string()
        .regex(
            /^\+?[1-9]\d{1,14}$/,
            "O número de contato precisa ser válido (formato internacional, ex: +5511999999999)"
        )
        .nonempty("Contato é obrigatório"),

    tipoIdentificador: Z
        .string()
        .min(1, "Tipo de identificador é obrigatório")
        .nonempty("Tipo de identificador é obrigatório"),

    identificador: Z
        .string()
        .min(1, "Identificador é obrigatório")
        .nonempty("Identificador é obrigatório"),
});


