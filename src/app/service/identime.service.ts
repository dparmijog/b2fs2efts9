import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class IdentiMeService {
    async getUsers(): Promise<any[]> {
        const response = await fetch('https://dparmijog.github.io/b2fs2exp3s8fake/users.json')
        return await response.json();
    }

    constructor(private http: HttpClient) { }
}
