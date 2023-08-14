for(let i=0; i<10; i++) {
    const nu1 = Math.floor(Math.random() * 900000) + 100000;
    const nu11 = Math.floor(Math.random() * 9000) + 1000;
    const nu111 = Math.floor(Math.random() * 90) + 10;
    const id = nu1 + "-" + nu11 + "-" + nu111;
    // console.log(id);
}
var stars = [];
const N = 10;
const chr = "0";
main: for(let i=0; i<N; i++) {
    stars[i] = "";
    for(let k=(N-1-i); k>=0; k--) {
        stars[i] += " ";
    }
    for(let j=0; j<(N*2+1); j++) {
        if(j==(i*2+1)) continue main;
        stars[i] += chr;
    }
}
for(let nom of stars) {
    console.log(nom);
}