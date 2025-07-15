-- Verificar si la base de datos ya existe y crearla si no
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MSITracker')
BEGIN
    CREATE DATABASE MSITracker;
END
GO

-- Usar la base de datos recién creada
USE MSITracker;
GO

---
--## Creación de Tablas
---

-- Tabla de Categorías
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Categorias]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Categorias](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [Nombre] [nvarchar](100) NOT NULL,
        CONSTRAINT [PK_Categorias] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
    PRINT 'Tabla [Categorias] creada.';
END
GO

-- Tabla de Usuarios
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Usuarios]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Usuarios](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [Email] [nvarchar](255) NOT NULL,
        [PasswordHash] [nvarchar](max) NOT NULL,
        [SueldoMensual] [decimal](18, 2) NULL,
        CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [UK_Usuarios_Email] UNIQUE NONCLUSTERED ([Email] ASC)
    );
    PRINT 'Tabla [Usuarios] creada.';
END
GO

-- Tabla de Compras
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Compras]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Compras](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [UsuarioId] [int] NOT NULL,
        [CategoriaId] [int] NOT NULL,
        [Descripcion] [nvarchar](200) NOT NULL,
        [MontoInicial] [decimal](18, 2) NOT NULL,
        [Parcialidades] [int] NOT NULL,
        [FechaCompra] [date] NOT NULL,
        [Banco] [nvarchar](100) NULL,
        CONSTRAINT [PK_Compras] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
    PRINT 'Tabla [Compras] creada.';
END
GO

---
--## Creación de Relaciones (Foreign Keys)
---

-- Relación: Compras -> Usuarios
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Compras_Usuarios]') AND parent_object_id = OBJECT_ID(N'[dbo].[Compras]'))
BEGIN
    ALTER TABLE [dbo].[Compras] WITH CHECK ADD CONSTRAINT [FK_Compras_Usuarios] FOREIGN KEY([UsuarioId])
    REFERENCES [dbo].[Usuarios] ([Id])
    ON DELETE CASCADE; -- Si se borra un usuario, se borran sus compras asociadas

    ALTER TABLE [dbo].[Compras] CHECK CONSTRAINT [FK_Compras_Usuarios];
    PRINT 'Relación FK_Compras_Usuarios creada.';
END
GO

-- Relación: Compras -> Categorias
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Compras_Categorias]') AND parent_object_id = OBJECT_ID(N'[dbo].[Compras]'))
BEGIN
    ALTER TABLE [dbo].[Compras] WITH CHECK ADD CONSTRAINT [FK_Compras_Categorias] FOREIGN KEY([CategoriaId])
    REFERENCES [dbo].[Categorias] ([Id]);

    ALTER TABLE [dbo].[Compras] CHECK CONSTRAINT [FK_Compras_Categorias];
    PRINT 'Relación FK_Compras_Categorias creada.';
END
GO

---
--## Inserción de Datos Iniciales (Seed Data)
---

-- Insertar categorías por defecto si la tabla está vacía
IF NOT EXISTS (SELECT 1 FROM [dbo].[Categorias])
BEGIN
    INSERT INTO [dbo].[Categorias] ([Nombre]) VALUES
    ('Tecnología'),
    ('Ropa y Accesorios'),
    ('Supermercado'),
    ('Viajes'),
    ('Hogar'),
    ('Salud y Belleza'),
    ('Entretenimiento'),
    ('Restaurantes'),
    ('Automotriz'),
    ('Otro');
    PRINT 'Datos iniciales para [Categorias] insertados.';
END
GO

PRINT 'Script de base de datos ejecutado correctamente.';