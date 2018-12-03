function rect(el) {
    return el.getBoundingClientRect();
}

let clientX = null;
let clientY = null;
let previousClientX = null;
let previousClientY = null;

const ROT_MULTIPLIER = 0.02;
const TRANS_MULTIPLIER = 0.05;

const CHILD_ROT_MULTIPLIER = 1 / 80 / 20;
const CHILD_TRANS_MULTIPLIER = 1 / 15 / 20;

const Z_INDEX_MULTIPLIER = 0.2;

function updatePanel() {
    const panel = document.querySelector("#panel");
    const d = rect(document.body);
    
    const w = d.width;
    const h = d.height;
    
    const w_center = w / 2;
    const h_center = h / 2;
    
    const mouse_x = clientX;
    const mouse_y = clientY;
    
    const current_x = mouse_x - w_center;
    const current_y = mouse_y - h_center;
    
    // const previous_x = previousClientX - w_center;
    // const previous_y = previousClientY - h_center;
    
    let x = current_x; // (current_x + previous_x) / 2;
    let y = current_y; // (current_y + previous_y) / 2;
    
    const transform = [];
    
    if (x) {
        if (x < 0) {
            transform.push(`rotateY(${-x * ROT_MULTIPLIER}deg)`);
            transform.push(`translateX(${-x * TRANS_MULTIPLIER}px)`);
        } else {
            transform.push(`rotateY(${-x * ROT_MULTIPLIER}deg)`);
            transform.push(`translateX(${-x * TRANS_MULTIPLIER}px)`);
        }
    }
    
    if (y) {
        if (y < 0) {
            transform.push(`rotateX(${y * ROT_MULTIPLIER}deg)`);
            transform.push(`translateY(${-y * TRANS_MULTIPLIER}px)`);
        } else {
            transform.push(`rotateX(${y * ROT_MULTIPLIER}deg)`);
            transform.push(`translateY(${-y * TRANS_MULTIPLIER}px)`);
        }
    }
    
    panel.style.transform = transform.join(" ");
    
    panel.childNodes.forEach(el => {
        if (typeof el.tagName !== "undefined") {
            const styles = window.getComputedStyle(el);
            const zIndex = styles["z-index"] * Z_INDEX_MULTIPLIER;
            
            if (!zIndex) {
                return;
            }
            
            let tr = [];
            
            if (x) {
                if (x < 0) {
                    tr.push(`rotateY(${zIndex * -x * CHILD_ROT_MULTIPLIER}deg)`);
                    tr.push(`translateX(${zIndex * -x * CHILD_TRANS_MULTIPLIER}px)`);
                } else {
                    tr.push(`rotateY(${zIndex * -x * CHILD_ROT_MULTIPLIER}deg)`);
                    tr.push(`translateX(${zIndex * -x * CHILD_TRANS_MULTIPLIER}px)`);
                }
            }
    
            if (y) {
                if (y < 0) {
                    tr.push(`rotateX(${zIndex * y * CHILD_ROT_MULTIPLIER}deg)`);
                    tr.push(`translateY(${zIndex * -y * CHILD_TRANS_MULTIPLIER}px)`);
                } else {
                    tr.push(`rotateX(${zIndex * y * CHILD_ROT_MULTIPLIER}deg)`);
                    tr.push(`translateY(${zIndex * -y * CHILD_TRANS_MULTIPLIER}px)`);
                }
            }
            
            el.style.transform = tr.join(" ");
        }
    });
    
    requestAnimationFrame(updatePanel);
}

function updatePerspective(event) {
    previousClientX = clientX;
    previousClientY = clientY;
    
    clientX = event.clientX;
    clientY = event.clientY;
}

document.body.addEventListener("mousemove", updatePerspective);
requestAnimationFrame(updatePanel);
