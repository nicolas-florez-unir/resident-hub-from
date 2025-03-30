import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { HttpClient } from '../domain/HttpClient';
import { applicationStorage } from 'src/boot/application-storage';

console.log(process.env);

export class AxiosHttpClient extends HttpClient {
  private readonly instance: AxiosInstance = axios.create({
    baseURL: process.env.BASE_API_URL ?? '',
  });

  async get<T>(url: string, params?: object): Promise<T> {
    const result = await this.instance.get<T>(url, {
      params,
      headers: {
        Authorization: `Bearer ${applicationStorage.getItem('token')}`,
      },
    });
    return result.data;
  }

  async post<T>(url: string, body: object): Promise<T> {
    const result = await this.instance.post<T>(url, body, {
      headers: {
        Authorization: `Bearer ${applicationStorage.getItem('token')}`,
      },
    });
    return result.data;
  }

  async put<T>(url: string, body: object): Promise<T> {
    const result = await this.instance.put<T>(url, body, {
      headers: {
        Authorization: `Bearer ${applicationStorage.getItem('token')}`,
      },
    });
    return result.data;
  }

  async delete<T>(url: string): Promise<T> {
    const result = await this.instance.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${applicationStorage.getItem('token')}`,
      },
    });
    return result.data;
  }
}
