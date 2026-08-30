const fs = require('fs');
const path = 'c:/Users/mrgaizi/Desktop/gdc/frontend/pages/charter.vue';
let content = fs.readFileSync(path, 'utf8');

// 8.4
const target84 = `          <div>
            <h4 class="text-lg font-bold">8.4 Authority for Accountability Actions</h4>
            <p>The President shall serve as the sole authority responsible for the issuance of Reminders, Concern Notices, Membership Reviews, and membership removals under this Charter.</p>
            <p class="mt-2">Department Directors may identify concerns, document issues, and submit recommendations to the President regarding the conduct, participation, or performance of Club Associates within their respective departments. However, Department Directors shall not possess the authority to issue Reminders, Concern Notices, Membership Reviews, or membership removals independently.</p>
            <p class="mt-2">The President may consult with Department Directors, the Treasurer, the Faculty Advisor, or other relevant individuals when evaluating a matter. However, all accountability actions shall remain the responsibility of the President unless otherwise specified by this Charter.</p>
            <p class="mt-2">The President shall communicate all Reminders, Concern Notices, Membership Reviews, and membership removals directly to the affected individual. Concern Notices, Membership Reviews, and membership removals shall be formally documented and maintained within the club's accountability records.</p>
          </div>`;

const replace84 = `          <div>
            <h4 class="text-lg font-bold">8.4 Authority for Accountability Actions</h4>
            <p>The President and Department Directors shall serve as the primary authorities responsible for the issuance of Reminders, Concern Notices, Membership Reviews, and membership removals under this Charter.</p>
            <p class="mt-2">Department Directors possess the authority to take accountability actions independently for members within their respective departments. Alternatively, a Department Director may request that the President take the action on their behalf. Such requests or notifications may be communicated through any official channel, email, or messaging platform (such as WhatsApp), provided that a clear, retrievable record is maintained for future reference.</p>
            <p class="mt-2">The President or the acting Department Director may consult with other leadership members, the Treasurer, or the Faculty Advisor when evaluating a matter. However, the authority to finalize an accountability action remains with the President or the relevant Department Director.</p>
            <p class="mt-2">The acting authority (President or Department Director) shall communicate all Reminders, Concern Notices, Membership Reviews, and membership removals directly to the affected individual. Concern Notices, Membership Reviews, and membership removals must be formally documented and maintained within the club's accountability records.</p>
          </div>`;

// 8.5
const target85 = `<p>A Reminder is an informal notice issued by the President when a minor concern is identified.</p>`;
const replace85 = `<p>A Reminder is an informal notice issued by the President or a Department Director when a minor concern is identified.</p>`;

// 8.6
const target86 = `<p>Concern Notices are formal notices issued by the President after a member has accumulated three (3) Reminders or when a concern persists beyond the Reminder stage.</p>`;
const replace86 = `<p>Concern Notices are formal notices issued by the President or a Department Director after a member has accumulated three (3) Reminders or when a concern persists beyond the Reminder stage.</p>`;

// 8.7
const target87 = `<p class="mt-2">Following review, the President may determine whether the member's membership should be terminated. The basis for such determination shall be documented within the club's accountability records.</p>`;
const replace87 = `<p class="mt-2">Following review, the President or the relevant Department Director may determine whether the member's membership should be terminated. The basis for such determination shall be documented within the club's accountability records.</p>`;

// 8.8
const target88 = `<p class="mt-2">Such matters may result in immediate removal from leadership positions, termination of membership, or other corrective actions deemed appropriate by the President.</p>`;
const replace88 = `<p class="mt-2">Such matters may result in immediate removal from leadership positions, termination of membership, or other corrective actions deemed appropriate by the President or the relevant Department Director.</p>`;


content = content.replace(target84, replace84);
content = content.replace(target85, replace85);
content = content.replace(target86, replace86);
content = content.replace(target87, replace87);
content = content.replace(target88, replace88);

fs.writeFileSync(path, content, 'utf8');
console.log('done');`;
