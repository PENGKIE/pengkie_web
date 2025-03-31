
module.exports = main;

async function main() {

    return `<style>
        table {
            background-color: rgba(238, 238, 238, 0.31);
        }
        th {
            padding: 6px;
            background-color: grey;
        }
        td {
            padding: 6px;
            border-bottom: 1px solid grey;
        }
        h5 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .flutter {
            display: block;
            font-size: 5em;
        }
        .second-table {
            background-color: transparent;
        }
        .second-table tr td:first-child {
            font-weight: bold;
            text-align: end;
        }
    </style>
    <p class="demoTitle">&nbsp;</p>
    <p><strong>ข้อกำหนดและเงื่อนไขการใช้บริการ PENGKIE</strong></p>
    <p><span style="font-weight: 400;">ข้อกำหนดและเงื่อนไขการใช้บริการนี้ (ต่อไปนี้เรียกว่า "เงื่อนไขการใช้บริการ") เป็นข้อตกลงระหว่าง บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) (ต่อไปนี้เรียกว่า "บริษัท") ฝ่ายหนึ่ง กับ ผู้ใช้บริการที่ใช้บริการใดๆ ผ่านแอปพลิเคชัน PENGKIE (ต่อไปนี้เรียกว่า "ผู้ใช้บริการ") อีกฝ่ายหนึ่ง โดยผู้ใช้บริการตกลงที่จะผูกพันตามเงื่อนไขการใช้บริการนี้ ซึ่งมีรายละเอียดดังต่อไปนี้:</span></p>
    <ol>
    <li><strong> การสมัครใช้บริการ</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">1.1 ผู้ใช้บริการต้องมีอายุ 20 ปีขึ้นไป หรือได้รับความยินยอมจากผู้ปกครองตามกฎหมาย</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">1.2 ผู้ใช้บริการต้องให้ข้อมูลที่เป็นความจริงและเป็นปัจจุบัน หากมีการเปลี่ยนแปลงข้อมูล ผู้ใช้บริการต้องอัปเดตข้อมูลให้ถูกต้อง</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">1.3 ผู้ใช้บริการแต่ละรายสามารถลงทะเบียนได้เพียง 1 บัญชี PENGKIE เท่านั้น</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">1.4 บริษัทขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชี หากผู้ใช้บริการให้ข้อมูลเท็จ หรือละเมิดเงื่อนไข</span></li>
    </ul>
    <li><strong> การคุ้มครองข้อมูลส่วนบุคคล</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">บริษัทจะเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลตามนโยบายความเป็นส่วนตัวของบริษัท ซึ่งผู้ใช้บริการสามารถศึกษาได้ในแอปพลิเคชัน PENGKIE</span></li>
    </ul>
    <li><strong> การให้บริการของ PENGKIE</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">3.1 PENGKIE เป็นแพลตฟอร์มกลางที่เชื่อมโยงผู้ขาย (ร้านค้า/ผู้ขาย) และผู้ซื้อ (ผู้บริโภค) เพื่ออำนวยความสะดวกในการซื้อขายสินค้าและบริการ</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">3.2 บริษัทไม่มีส่วนเกี่ยวข้องกับการชำระเงินใดๆ การชำระเงินระหว่างผู้ซื้อและผู้ขายจะดำเนินการภายนอกแพลตฟอร์ม PENGKIE โดยตรง</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">3.3 บริษัทไม่รับผิดชอบต่อความปลอดภัยหรือความถูกต้องของการชำระเงินที่ดำเนินการภายนอกแพลตฟอร์ม</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">3.4 บริษัทไม่รับประกันคุณภาพ ความถูกต้อง หรือความเหมาะสมของสินค้าและบริการที่นำเสนอโดยผู้ขายบนแพลตฟอร์ม PENGKIE</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">3.5 ผู้ใช้บริการรับทราบและยอมรับว่าการทำธุรกรรมใดๆ ผ่าน PENGKIE เป็นการทำธุรกรรมโดยตรงระหว่างผู้ซื้อและผู้ขาย โดยบริษัทเป็นเพียงผู้ให้บริการแพลตฟอร์มกลางเท่านั้น</span></li>
    </ul>
    <li><strong> การสั่งซื้อและการติดต่อผู้ขาย</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">4.1 ผู้ใช้บริการสามารถติดต่อผู้ขายโดยตรงผ่านช่องทางที่ PENGKIE จัดเตรียมไว้</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">4.2 รายละเอียดสินค้า ราคา เงื่อนไขการซื้อขาย และการจัดส่งเป็นไปตามที่ผู้ขายกำหนด</span></li>
    </ul>
    <li><strong> การเปลี่ยน/คืนสินค้าและการคืนเงิน</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">5.1 การเปลี่ยน/คืนสินค้าและการคืนเงินเป็นไปตามนโยบายของผู้ขายแต่ละราย โดยบริษัทไม่มีส่วนเกี่ยวข้อง</span></li>
    </ul>
    <li><strong> ทรัพย์สินทางปัญญา</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">6.1 ผู้ใช้บริการต้องไม่ละเมิดทรัพย์สินทางปัญญาของ บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) ที่เกี่ยวข้องกับ PENGKIE</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">6.2 ห้ามคัดลอก ดัดแปลง หรือเผยแพร่เนื้อหาใดๆ จากแอปพลิเคชัน PENGKIE โดยไม่ได้รับอนุญาต</span></li>
    </ul>
    <li><strong> ข้อจำกัดความรับผิด</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">7.1 บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) จะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดขึ้นจากการใช้งานแอปพลิเคชัน PENGKIE หรือจากการทำธุรกรรมระหว่างผู้ซื้อและผู้ขาย</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">7.2 บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขการให้บริการของ PENGKIE โดยไม่ต้องแจ้งให้ทราบล่วงหน้า</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">7.3 บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) จะไม่รับผิดชอบต่อความเสียหายที่เกิดจากความผิดพลาดในการพิมพ์ หรือข้อผิดพลาดที่ไม่ได้คาดการณ์ไว้ล่วงหน้า</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">7.4 บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) จะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากความไม่พอใจในสินค้า หรือบริการที่เกิดขึ้นระหว่างผู้ซื้อและผู้ขาย.</span></li>
    </ul>
    <li><strong> การระงับหรือยกเลิกการใช้งาน</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">8.1 บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) ขอสงวนสิทธิ์ในการระงับหรือยกเลิกการใช้งาน PENGKIE ของผู้ใช้บริการ หากมีการละเมิดเงื่อนไข</span></li>
    <li style="font-weight: 400;"><span style="font-weight: 400;">8.2 บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) ขอสงวนสิทธิ์ในการระงับหรือยกเลิกการใช้งาน PENGKIE ของผู้ใช้บริการ หากมีการกระทำที่ผิดกฎหมาย หรือส่อไปในทางทุจริต</span></li>
    </ul>
    <li><strong> กฎหมายที่ใช้บังคับ</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">9.1 เงื่อนไขการใช้บริการนี้อยู่ภายใต้บังคับของกฎหมายไทย</span></li>
    </ul>
    <li><strong> การแก้ไขเปลี่ยนแปลงเงื่อนไข</strong></li>
    <ul>
    <li style="font-weight: 400;"><span style="font-weight: 400;">10.1 บริษัท เพ้งกี้ จำกัด (PENGKIE CO., LTD.) สงวนสิทธิ์ในการแก้ไขเปลี่ยนแปลงเงื่อนไขการใช้บริการของ PENGKIE ได้ตลอดเวลา โดยไม่ต้องแจ้งให้ทราบล่วงหน้า</span></li>
    </ul>
     </ol>
    <p>&nbsp;</p>
    <!-- Comments are visible in the HTML source only --> `;
}