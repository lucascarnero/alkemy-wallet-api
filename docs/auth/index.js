module.exports = {
  "/auth/login": {
    post: {
      tags: ["Authentication"],
      description: "Obtener un token JWT para autenticarse en el sistema",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Sesion iniciada con exito",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResult",
              },
            },
          },
        },
        404: {
          description: "Combinacion de usuario o contrasena no encontrada",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  "/auth/me": {
    get: {
      tags: ["Authentication"],
      description: "Obener la informacion del usuario que inicio la sesion",
      parameters: [],
      responses: {
        200: {
          description: "Datos del usuario",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Sin acceso (posible falta de token)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
};