import { Injectable } from '@angular/core';
import { CacheAsyncQuery } from '../classes/cache-async-query';
import { QueryOptionsType } from '../types/get-user.type';

@Injectable({
  providedIn: 'root'
})
export class CacheQueriesService {
  //naming convaention __fn-${fullname}_of-${offset}_li-${limit}
  GetUsersAndCount = new CacheAsyncQuery();

  constructor() { }

  nameFromGetUsersAndCount({fullname, offset, limit}: QueryOptionsType = {}) {
    fullname = fullname || '';
    offset = offset || 0;
    limit - limit || 0;
    return `__fn-${fullname}_of-${offset}_li-${limit}`;
  }
}
