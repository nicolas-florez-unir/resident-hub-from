export class UpdateUserDto {
  constructor(
    private readonly id: number,
    private readonly email: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly phone: string,
    private readonly role: string,
  ) {}

  public getId(): number {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getFistName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getRole(): string {
    return this.role;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
