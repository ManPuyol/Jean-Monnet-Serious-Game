
# Serious game para la Cátedra Jean Monnet

Esta aplicación es una herramienta pedagógica para la gamificación de cursos, especializada en la [Cátedra Jean Monnet de la Universidad Europea del Atlántico](https://catedrajeanmonnet.uneatlantico.es/)

[Enlace a la aplicación](https://jean-monnet-sg.vercel.app/)
<hr>

## Tabla de Contenidos
1. [Características](#características)
2. [Tecnologías Usadas](#tecnologías-usadas)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Despliegue](#despliegue)
6. [Contribuciones](#contribuciones)


## Características

- Módulo de Profesor: Permite crear y gestionar asignaturas, temas y preguntas.
- Módulo de Estudiante: Ofrece inscripción en asignaturas, seguimiento de progreso y participación en cuestionarios.
- Sistema de Gamificación: Incluye logros, puntuaciones y misiones para aumentar el engagement.
- Interfaz Responsiva: Diseñada para funcionar en dispositivos móviles y de escritorio.

## Tecnologías Usadas

- **Next.js**: Framework de React para aplicaciones web.
- **TypeScript**: Superconjunto tipado de JavaScript.
- **React**: Biblioteca para la construcción de interfaces de usuario.
- **Supabase**: Plataforma de backend que incluye PostgreSQL.
- **Drizzle ORM**: ORM para la interacción con la base de datos.
- **Tailwind CSS**: Framework de utilidades CSS.
- **Lucide**: Colección de iconos reactivos.
- **Radix**: Componentes accesibles y personalizables para React.
- **Vercel**: Plataforma de alojamiento para frontend.

## Instalación

Instrucciones paso a paso para configurar el proyecto localmente.

1. Clonar el repositorio:
   \`\`\`sh
   git clone https://github.com/ManPuyol/Jean-Monet-Serious-Game
   \`\`\`
2. Navegar al directorio del proyecto:
   \`\`\`sh
   cd tu_repositorio
   \`\`\`
3. Instalar dependencias:
   \`\`\`sh
   npm install
   \`\`\`
4. Configurar las variables de entorno:
   - Crear un archivo \`.env\` en la raíz del proyecto.
   - Añadir las siguientes variables de entorno (modifica según tus necesidades):
     \`\`\`env
     DATABASE_URL= url_otorgada_por_Supabase
     NEXT_PUBLIC_SUPABASE_URL= tu_url_de_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY= tu_anon_key
     \`\`\`

## Uso

Instrucciones sobre cómo ejecutar la aplicación localmente.

1. Iniciar el servidor de desarrollo:
   \`\`\`sh
   npm run dev
   \`\`\`
2. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Despliegue

Instrucciones para desplegar la aplicación en producción.

1. Configurar el proyecto en Vercel:
   - Iniciar sesión en [Vercel](https://vercel.com).
   - Importar el proyecto desde GitHub.
   - Configurar las variables de entorno en Vercel.
  
<br>

2. Hacer push de los cambios a la rama principal:
   \`\`\`sh
   git add .
   git commit -m "Cambios realizados"
   git push origin main
   \`\`\`

Vercel desplegará automáticamente la aplicación con cada push a la rama principal.

## Contribuciones

Instrucciones para contribuir al proyecto.

1. Hacer un fork del proyecto.
2. Crear una nueva rama (\`git checkout -b feature/nueva-funcionalidad\`).
3. Realizar los cambios necesarios y hacer commit (\`git commit -m "Añadir nueva funcionalidad"\`).
4. Hacer push a la rama (\`git push origin feature/nueva-funcionalidad\`).
5. Abrir un Pull Request.

