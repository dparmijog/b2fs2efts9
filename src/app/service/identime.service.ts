import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service responsible for user authentication and user data management
 * Provides methods to retrieve user information from external data sources
 * @class IdentiMeService
 */
@Injectable()
export class IdentiMeService {
    /**
     * Retrieves the list of registered users from the external API
     * Used for authentication and user validation processes
     * @returns Promise resolving to an array of user objects
     * @async
     */
    async getUsers(): Promise<any[]> {
        const response = await fetch('https://dparmijog.github.io/b2fs2exp3s8fake/users.json')
        return await response.json();
    }

    /**
     * Constructor that injects the HttpClient dependency
     * @param http - Angular HTTP client for making API requests
     */
    constructor(private http: HttpClient) { }
}
