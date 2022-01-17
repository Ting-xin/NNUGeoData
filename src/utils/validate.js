export function validate30Length(value) {
    return value.length > 30 ? true : false 
}

export function validate500Length(value) {
    return value.length > 500 ? true : false 
}

export function validateEmail(value) {
    let reg = new RegExp(/^[\w-]+@\w+\.\w+$/)
    return !reg.test(value)
}

/* 验证密码 6-20位，包含大小写字母和数字*/
export function validatePassword (value) {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/;
    return !reg.test(value)
  }

/* 验证验证码 6位验证码，包含数字字母*/
export function validateCheckCode (value) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value)
  }
