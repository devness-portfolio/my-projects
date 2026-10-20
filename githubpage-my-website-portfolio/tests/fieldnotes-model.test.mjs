import test from 'node:test';import assert from 'node:assert/strict';import {seed,move,progress} from '../portfolio/fieldnotes/model.mjs';
test('moves preserve other tasks and input state',()=>{const before=seed();const after=move(before,'keyboard','Done');assert.equal(before[1].stage,'In progress');assert.equal(after[1].stage,'Done');assert.deepEqual(after[0],before[0]);assert.deepEqual(progress(after),{done:2,total:3,percent:67})});
test('invalid stages and missing tasks cannot corrupt state',()=>{const s=seed();assert.equal(move(s,'keyboard','invalid'),s);assert.equal(move(s,'missing','Done'),s)});
test('completion and empty progress are bounded',()=>{assert.equal(progress(seed().map(t=>({...t,stage:'Done'}))).percent,100);assert.deepEqual(progress([]),{done:0,total:0,percent:0})});
test('reset creates an independent fixture',()=>{const a=seed();a[0].stage='Ready';assert.equal(seed()[0].stage,'Done')});
