import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const app=readFileSync(new URL('../app.js', import.meta.url),'utf8');
const css=readFileSync(new URL('../style.css', import.meta.url),'utf8');
test('signup has distinct international dial code and exactly nine local digits',()=>{
 assert.match(app,/name="phone_code"/);
 assert.match(app,/name="phone_local"/);
 assert.match(app,/\^\[0-9\]\{9\}\$/);
 assert.match(app,/const phone=code\+local/);
 assert.match(app,/full_name:x\.full_name,phone\}/);
});
test('dark theme can be toggled and persisted',()=>{
 assert.match(app,/localStorage\.setItem\('algharisat-theme'/);
 assert.match(app,/function toggleTheme\(/);
 assert.match(css,/:root\[data-theme="dark"\]/);
 assert.match(css,/\[data-theme="dark"\] \.mobile-nav/);
});
test('brown buttons use white text and follow-up keeps table rows at mobile widths',()=>{
 assert.match(css,/\.btn\.goldbtn[^\n]*color:#fff!important/);
 assert.match(css,/\.followup-edit-table tbody tr[^\n]*display:table-row!important/);
 assert.match(css,/\.followup-table-scroll[^\n]*overflow-x:auto!important/);
 assert.match(css,/\.followup-edit-table \.followup-name-cell[^\n]*position:sticky!important/);
});
