//二维码生成参考 https://github.com/tomfriwel/weapp-qrcode
export function createQrCode(uid, currentStep = (Date.parse(new Date()) / 1000) + 60) {
    if (uid === undefined)
        return null
    let cod = ''
    for (let i = 0; i < 6; i++) {
        cod += Math.floor(Math.random() * 10)
    }
    let pm = `&typ=2&exp=${currentStep}&usr=${uid}&cod=${cod}`
    let pmHash = getHash33(pm)
    return `${pm}&chk=${pmHash}`
}

export function getHash33(str) {
    let result = 0xFFFFFFFF
    for (let s of str) {
       // console.log(s)
       // console.log(s.codePointAt(0))
        result += s.codePointAt(0);
        result *= 33;
        result = result & 0xFFFFFFFF;
        if (result < 0)
            result += 1 + 0xFFFFFFFF
       // console.log(result)
    }
    return result;
}