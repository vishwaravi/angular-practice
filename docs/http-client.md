# HTTP Client

> **Source:** `src/app/http-client/`

## Overview

Angular's `HttpClient` (from `@angular/common/http`) provides a typed, Observable-based API for making HTTP requests. It must be provided at the application level before it can be injected into services.

## Setup

```typescript
// src/app/app.config.ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()]
};
```

---

## Data Model

```typescript
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

---

## PostService — CRUD Operations

```typescript
// src/app/http-client/post-service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  /** Fetch all posts */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  /** Fetch a single post by ID */
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  /** Create a new post */
  addPost(post: Partial<Post>): Observable<any> {
    return this.http.post(this.apiUrl, post);
  }

  /** Replace an existing post */
  updatePost(newPost: Post, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, newPost);
  }

  /** Delete a post */
  deletePost(id: number): Observable<any> {
    return this.http.delete<Post>(`${this.apiUrl}/${id}`);
  }
}
```

---

## Consuming the Service in a Component

```typescript
// src/app/http-client/post-comp/post-comp.ts
import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../post-service';

@Component({ selector: 'app-post-comp', ... })
export class PostComp implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }
}
```

```html
@for (post of posts; track post.id) {
  <div>
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
}
```

---

## HTTP Methods Summary

| Method | Service call | HTTP verb |
|---|---|---|
| Read all | `getPosts()` | `GET /posts` |
| Read one | `getPostById(id)` | `GET /posts/:id` |
| Create | `addPost(post)` | `POST /posts` |
| Replace | `updatePost(post, id)` | `PUT /posts/:id` |
| Delete | `deletePost(id)` | `DELETE /posts/:id` |

---

## Error Handling

Use RxJS `catchError` to handle failures gracefully:

```typescript
import { catchError, of } from 'rxjs';

getPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(this.apiUrl).pipe(
    catchError(err => {
      console.error(err);
      return of([]);  // return empty array on error
    })
  );
}
```

## Further Reading

- [Angular HttpClient guide](https://angular.dev/guide/http)
- [JSONPlaceholder — fake REST API](https://jsonplaceholder.typicode.com/)
