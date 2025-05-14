# Linksphere

**Linksphere** is a modern web application that enables users to create personal profiles and corporate employee profiles while also offering a powerful link shortening service. It is designed to help you manage and share your online presence effortlessly.

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![GitHub issues](https://img.shields.io/github/issues/denizzhansahin/link-card)](https://github.com/denizzhansahin/link-card/issues)  
[![GitHub stars](https://img.shields.io/github/stars/denizzhansahin/link-card)](https://github.com/denizzhansahin/link-card/stargazers)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [GraphQL API](#graphql-api)
- [Technical Details](#technical-details)
- [DeepWiki Documentation](#deepwiki-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Repository](#repository)

## Features

- **Personal Profile Creation:** Users can build and customize their personal profiles with information such as name, contact details, and profile photo.
- **Corporate Profile Management:** Corporate users can manage employee profiles and company links in one integrated dashboard.
- **Link Shortening:** Transform long URLs into short, memorable links that are easier to share.
- **QR Code Generation:** Automatically generate QR codes for the shortened links.
- **GraphQL API:** Full-featured GraphQL queries and mutations for managing users and links.
- **JWT Authentication:** Secure access control using JSON Web Tokens with role-based authorization.
- **Responsive Dashboard:** Manage both personal and corporate links with an intuitive, responsive interface.

## Technologies

- **Backend:** NestJS, TypeORM, SQLite, GraphQL, Apollo Server
- **Frontend:** Next.js, Apollo Client, Tailwind CSS, Lucide Icons
- **Authentication:** JWT, Role-based Authorization

## Installation

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/denizzhansahin/link-card.git
   cd link-card
   ```

2. **Install Backend Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Backend Server:**
   ```bash
   npm run start:dev
   ```
   The backend will start on [http://localhost:5000](http://localhost:5000).

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd link-card-nextjs
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Frontend Server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- **Link Shortening:** Use the homepage to enter long URLs and generate short, shareable links.
- **Profile Management:** Access your dashboard to update personal or corporate profile details.
- **QR Code Generation:** Use the QR code feature to generate scannable codes for your shortened links.
- **Social Sharing:** Easily share your links across social media platforms with integrated share buttons.

## GraphQL API

Explore and test the powerful GraphQL API using the built-in Playground at [http://localhost:5000/graphql](http://localhost:5000/graphql). Some example queries:

### Get a Random User Nickname
```graphql
query {
  getRandomNickname
}
```

### Get a Random Link Token
```graphql
query {
  getRandomLink
}
```

### Create a New User
```graphql
mutation {
  kullaniciOlustur(kullaniciData: {
    isim: "John",
    soyisim: "Doe",
    nickname: "jdoe",
    eposta: "john.doe@example.com",
    sifre: "securepassword",
    role: "KULLANICI",
    ulke: "USA",
    fotograf: ""
  }) {
    id
    nickname
  }
}
```

## Technical Details

This section provides more code examples and explanations regarding the backend architecture, coding practices, and GraphQL integration.

### Backend Implementation

Our backend is built using [NestJS](https://nestjs.com/), leveraging TypeORM for database management and Apollo Server for GraphQL API support.

**Example: NestJS Module Setup**
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kullanici } from './Entities/kullanici.entity';
import { KisiselLink } from './Entities/kisiselLink.entity';
import { KurumsalLink } from './Entities/kurumsalLink.entity';
import { Link } from './Entities/kisalink.entity';
import { KullaniciModule } from './kullanici/kullanici.module';
import { LinkIslemlerModule } from './link_islemler/link_islemler.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Kullanici, KisiselLink, KurumsalLink, Link],
      synchronize: true,
    }),
    KullaniciModule,
    LinkIslemlerModule,
    // ...other modules...
  ],
})
export class AppModule {}
```

### GraphQL Schema & Resolvers

GraphQL schema is automatically generated from the resolvers and DTOs. The following examples illustrate how our queries and mutations are structured:

**Random Nickname Query Resolver:**
```typescript
// src/GraphQl/KullaniciQuery.ts
@Resolver(() => Kullanici)
export class KullaniciGraphQl {
  constructor(private kullaniciService: KullaniciService) {}
  
  @Public()
  @Query(() => String, { name: 'getRandomNickname' })
  async getRandomNickname(): Promise<string> {
    return await this.kullaniciService.getRandomNickname();
  }
  // ...other resolvers...
}
```

**Sample Mutation: Creating a User**
```typescript
// src/GraphQl/KullaniciQuery.ts
@Public()
@Mutation(() => Kullanici, { name: 'kullaniciOlustur' })
async createKullanici(@Args('kullaniciData') kullaniciData: KullaniciOlusturDto): Promise<Kullanici> {
  return this.kullaniciService.kullaniciOlustur(kullaniciData);
}
```

### Coding Practices

- **Modularity:** The project is structured into modules (e.g., KullaniciModule and LinkIslemlerModule) to keep related functionality encapsulated.
- **Error Handling:** We use NestJS's built-in exception filters for graceful error management.
- **Security:** JWT authentication and role-based authorization (implemented via custom guards) ensure secure access.
- **Code Quality:** TypeScript is used throughout the backend for strong typing, and auto-generated GraphQL schema keeps the API consistent.
- **Testing:** GraphQL Playground aids in rapid testing of queries and mutations before integration with the frontend.

## DeepWiki Documentation

For extended documentation, tutorials, and in-depth insights into the **Linksphere** project, please visit our dedicated DeepWiki site:

[https://deepwiki.com/denizzhansahin/link-card](https://deepwiki.com/denizzhansahin/link-card)

This DeepWiki page offers comprehensive information including:
- Detailed architecture diagrams
- Step-by-step setup guides for both backend and frontend environments
- Advanced usage instructions and best practices
- Troubleshooting and FAQ sections
- Contribution guidelines and project roadmap

We highly recommend checking the DeepWiki documentation to fully leverage the capabilities of Linksphere and to stay updated with the latest improvements and community contributions.

## Contributing

Contributions are welcome! If you have suggestions, bug fixes, or new features:
- Fork the repository
- Create a new branch (`git checkout -b feature/your-feature`)
- Commit your changes
- Push to the branch (`git push origin feature/your-feature`)
- Open a pull request

Please check our [Issue Tracker](https://github.com/denizzhansahin/link-card/issues) for tasks and bugs.

## License

This project is licensed under a custom license by Space Teknopoli. Please refer to the [LICENSE](LICENSE) file for full details regarding your rights and obligations.

## Repository

For more details or to report issues, please visit the GitHub repository:  
[https://github.com/denizzhansahin/link-card](https://github.com/denizzhansahin/link-card)

---

Enjoy using **Linksphere** and streamline your online presence with ease!
