module.exports = {
  "/roles": {
    post: {
      tags: ["Roles"],
      description: "Crear un rol",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Role",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Rol creado exitosamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Role",
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
    get: {
      tags: ["Roles"],
      description: "Listar todos los roles",
      parameters: [],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Role",
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
  "/role/{id}": {
    get: {
      tags: ["Roles"],
      description: "Ver detalle de un rol",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del rol",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Role",
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
      tags: ["Roles"],
      description: "Modificar un rol existente",
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
              $ref: "#/components/schemas/Role",
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
                $ref: "#/components/schemas/Role",
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
      tags: ["Roles"],
      description: "Elimina un rol",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del rol",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Role",
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
