

export class Category {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;

  // static fromJson(object: { [key: string]: any }): CategoryEntity {
  //   const { id, name, createdAt, updatedAt } = object;

  //   // if (!id) throw CustomError.badRequest('Missing ID');
  //   // if (!name) throw CustomError.badRequest('Missing name');
  //   // if(!email) throw CustomError.badRequest('Missing email');

  //   // const budgetsFromJson = budgets
  //   //   ? budgets.map((budget: Budget) => BudgetEntity.fromJson(budget))
  //   //   : budgets;


  //   return new CategoryEntity(id, name, email,  createdAt, updatedAt );
  // }
}

