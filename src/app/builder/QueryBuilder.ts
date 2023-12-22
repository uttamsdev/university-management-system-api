import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>; //model ta array of object dibe othtoba ekta object dibe
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      //searchTerm="komol" email, fristname ba permanent address kohtaio pertial match holei retrun kobre result
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' }, //options: i for case insensetive //field j field k search korbo seta dynamically pabe
        }) as FilterQuery<T>),
      });
    }
    return this; //chaining korar jono this return kortesi
  }

  //filtering
  filter(){
    const queryObj = {...this.query}; //queryObj e query copy kortesi
    const excludeFields = ['searchTerm','sort', 'limit', 'page', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]) // searchTerm filed ta k exclude kore dicce

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    // console.log(query, queryObj)
    return this;
  }

  //sort 
  sort(){
    const sort = (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt" //createdAt descending order e sort hobe by default 
    //(this?.query?.fields as string)?.split(",")?.join(" ") to enable sort on multiple fields
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  //pagination
  paginate(){
    const page = Number(this?.query?.page)|| 1; //this.query te page pele page er value dibe or 1
    const limit = Number(this?.query?.limit) || 1;
    const skip = (page-1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this;
  }

  //fields filtering
  fields(){
    const fields = (this?.query?.fields as string)?.split(",")?.join(" ") || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;