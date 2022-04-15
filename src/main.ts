class Vector {
    items: number[]

    constructor(private length: number, fill = 0) {
        this.items = new Array(length).fill(0).map(_ => fill)
    }

    get(index: number) {
        if (index >= this.items.length || index < 0) {
            throw "Index out of range"
        }

        return this.items[index]
    }

    set(index: number, value: number) {
        if (index >= this.items.length || index < 0) {
            throw "Index out of range"
        }

        this.items[index] = value
    }

    dot(rhs: Vector) {
        if (rhs.items.length !== this.length) {
            throw "Mismatched vector sizes"
        }

        let sum = 0

        this.items.forEach((item, index) => {
            // Could just use indexing but defeats the purpouse of using checks
            // TODO: Could use a global to indicate whether to use the .get method or not
            sum += item * rhs.get(index)
        })

        return sum
    }

    toString() {
        return this.items.toString()
    }
}


class Matrix {
    columns: Vector[]

    constructor(public width: number, public height: number, fill = 0) {
        this.columns = new Array(width).fill(0).map(_ => {
            return new Vector(height, fill)
        })
    }

    get(x: number): Vector;
    get(x: number, y: number): number;

    get(x: number, y?: number) {
        if (x >= this.width || x < 0) {
            throw "Index out of range"
        }

        if (y) {
            return this.columns[x].get(y)
        } else {
            return this.columns[x]
        }
    }

    set(x: number, y: number, value: number) {
        if (x >= this.width || x < 0) {
            throw "Index out of range"
        }

        return this.columns[x].set(y, value)
    }

    transpose() {
        const output = new Matrix(this.height, this.width)
        this.columns.forEach((column, x) => {
            column.items.forEach((item, y) => {
                output.set(y, x, item)
            })
        })

        return output
    }

    mul(rhs: Matrix) {
        const rhsT = rhs.transpose()

        const output = new Matrix(this.width, rhs.height)

        rhsT.columns.forEach((lColumn, x) => {
            this.columns.forEach((rColumn, y) => {
                output.set(y, x, lColumn.dot(rColumn))
            })
        })

        return output
    }

    toString() {
        return '{\n' + this.columns.map((column) => column.toString()).join(',\n') + '\n}'
    }
}

const mat1 = new Matrix(1, 3)

mat1.set(0, 0, 1)
mat1.set(0, 1, 2)
mat1.set(0, 2, 3)

console.log(mat1.toString())

const mat2 = new Matrix(3, 1)

mat2.set(0, 0, 4)
mat2.set(1, 0, 5)
mat2.set(2, 0, 6)

console.log(mat2.toString())


console.log(mat1.mul(mat2).toString())
console.log(mat2.mul(mat1).toString())
