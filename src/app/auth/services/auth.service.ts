import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticatedUser } from "src/app/models/authenticated-user.model";
import { ResponseJwt } from "src/app/models/response-jwt.model";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService{

    corsHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': environment.BACK_END_URL
    });

    private role: string = "user";
    constructor(
        private http: HttpClient
    ){}
    getRole(){
      return this.role
    }
    login(email, password){

        return this.http.post<any>(`${environment.BACK_END_URL_API}/auth/login`, {
            email,
            password
        }, {
            headers: this.corsHeaders
        })
    }

    register(username, email, password, role, city, country, zip){

        return this.http.post<any>(`${environment.BACK_END_URL_API}/auth/register`, {
            username,
            email,
            password,
            role,
            city,
            country,
            zip
        })
    }

    formatResponse(responseJwt: ResponseJwt){
        const user = new User(
            responseJwt.user.id,
            responseJwt.user.uuid,
            responseJwt.user.username,
            responseJwt.user.email,
            responseJwt.user.age,
            responseJwt.user.gender,
            responseJwt.user.phone,
            responseJwt.user.email_verified_at,
            responseJwt.user.created_at,
            responseJwt.user.updated_at,
            responseJwt.user.role,
            responseJwt.user.is_activated,
            responseJwt.user.userImg,
            responseJwt.user.zip,
            responseJwt.user.city,
            responseJwt.user.country
        );
        const expiresIn = new Date( new Date().getTime() + +responseJwt.expires_in * 1000);

        const authUser: AuthenticatedUser = {
            user: user,
            token: responseJwt.access_token,
            tokenType: responseJwt.token_type,
            expiresIn: expiresIn
        }
        return authUser
    }

    persistUser(user: AuthenticatedUser){
        localStorage.setItem("authUser", JSON.stringify(user));
    }

    updateUserInfo(user){
      return this.http.post<any>(`${environment.BACK_END_URL_API}/user`, user)
    }

    getUserInfo(user){
      return this.http.get<any>(`${environment.BACK_END_URL_API}/user`, user)
    }

    getAuthenticatedUserFromLocalStorage(){
        const authenticatedUserString = localStorage.getItem("authUser");

        if(authenticatedUserString){
            const authenticatedUserData = JSON.parse(authenticatedUserString);
            const user = new User(
                authenticatedUserData.user.id,
                authenticatedUserData.user.uuid,
                authenticatedUserData.user.username,
                authenticatedUserData.user.email,
                authenticatedUserData.user.age,
                authenticatedUserData.user.gender,
                authenticatedUserData.user.phone,
                authenticatedUserData.user.emaiVerifiedAt,
                authenticatedUserData.user.createdAt,
                authenticatedUserData.user.updatedAt,
                authenticatedUserData.user.userRole,
                authenticatedUserData.user.isActivated,
                authenticatedUserData.user.userImg,
                authenticatedUserData.user.zip,
                authenticatedUserData.user.city,
                authenticatedUserData.user.country,
            );
            const authenticatedUser: AuthenticatedUser = {
                user: user,
                expiresIn: authenticatedUserData.expiresIn,
                token: authenticatedUserData.token,
                tokenType: authenticatedUserData.tokenType
            }

            return authenticatedUser;
        }

        return null;

    }

  formatUser(authenticatedUserData): AuthenticatedUser{
    const authenticatedUserString = localStorage.getItem("authUser");
    const authenticatedUserD = JSON.parse(authenticatedUserString);
      const user = new User(
        authenticatedUserData.id,
        authenticatedUserData.uuid,
        authenticatedUserData.username,
        authenticatedUserData.email,
        authenticatedUserData.age,
        authenticatedUserData.gender,
        authenticatedUserData.phone,
        authenticatedUserData.email_verified_at,
        authenticatedUserData.created_at,
        authenticatedUserData.updated_at,
        authenticatedUserData.role,
        authenticatedUserData.is_activated,
        authenticatedUserData.userImg,
        authenticatedUserData.zip,
        authenticatedUserData.city,
        authenticatedUserData.country,
    );
    const authenticatedUser: AuthenticatedUser = {
      user: user,
      expiresIn: authenticatedUserD.expiresIn,
      token: authenticatedUserD.token,
      tokenType: authenticatedUserD.tokenType
    }
    localStorage.setItem("authUser", JSON.stringify(authenticatedUser));
    return authenticatedUser;

  }

  logout(){
    localStorage.removeItem("authUser");
  }

}
