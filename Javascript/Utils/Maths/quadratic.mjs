//return list of solutions to quadratic of form "ax^2 + bx + c == 0"
//ordered from smallest to largest
export function quadraticSolver(a, b, c) {
    var discriminant = b*b - 4*a*c;
    if (discriminant < 0) {
        return [];
    }
    else if (discriminant == 0) {
        return [-b/(2*a)];
    }
    else if (a > 0){
        return [
            (-Math.sqrt(discriminant) - b)/(2*a),
            (Math.sqrt(discriminant) - b)/(2*a)
        ];
    }
    else {
        return [
            (Math.sqrt(discriminant) - b)/(2*a),
            (-Math.sqrt(discriminant) - b)/(2*a)
        ]
    }
}
