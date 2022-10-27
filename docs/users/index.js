module.exports = {
  "/users": {
    post: {
      tags: ["Users"],
      description: "Crear un usuario",
      summary: "Crear un usuario",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Usuario creado exitosamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        500: {
          description: "Error de servidor",
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
    get: {
      security: [
        {
          BearerAuth: [],
        },
      ],

      tags: ["Users"],
      description: "Listar todos los usuarios",
      summary: "Listar todos los usuarios",
      parameters: [],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Sin acceso de administrador",
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
  "/users/{id}": {
    get: {
      tags: ["Users"],
      description: "Ver detalle de un usuario",
      summary: "Ver detalle de un usuario",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del usuario",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
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
    put: {
      tags: ["Users"],
      summary: "Modificar un usuario existente",
      description: "Modificar un usuario existente",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del rol",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
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
    delete: {
      security: [
        {
          BearerAuth: [],
        },
      ],
      summary: "Eliminar un usuario",
      tags: ["Users"],
      description: "Elimina un usuario",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del usuario",
        },
      ],
      responses: {
        200: {
          description: "Eliminacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
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
