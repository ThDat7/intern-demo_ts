// Generic Class
// Generic class là class có sử dụng kiểu dữ liệu generic (<>), cho phép linh hoạt các kiểu dữ liệu khi sử dụng như tạo instance, kế thừa… sẽ quyết định kiểu dữ liệu generic này.
// example:
class GenericClass<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }
}

// Generics Constraints
// Generics constraints giúp chúng ta giới hạn kiểu dữ liệu generic chỉ chấp nhận các kiểu dữ liệu nào đó.
// example:
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

// Generic Interfaces
// Generic interfaces tương tự generic class giúp chúng ta tạo ra các interface có thể sử dụng kiểu dữ liệu linh hoạt.
// example:
interface GenericIdentityFn<T> {
  (arg: T): T
}
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn<number> = identity
