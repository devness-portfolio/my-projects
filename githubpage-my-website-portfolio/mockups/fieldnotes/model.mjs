export const stages=['Ready','In progress','Done'];
export const seed=()=>[{id:'layout',title:'Refine the project card',stage:'Done',category:'DESIGN'},{id:'keyboard',title:'Check keyboard navigation',stage:'In progress',category:'ACCESSIBILITY'},{id:'release',title:'Review the mobile layout',stage:'Ready',category:'RELEASE'}];
export function move(tasks,id,stage){if(!stages.includes(stage)||!tasks.some(t=>t.id===id))return tasks;return tasks.map(t=>t.id===id?{...t,stage}:t)}
export function progress(tasks){const done=tasks.filter(t=>t.stage==='Done').length;return {done,total:tasks.length,percent:tasks.length?Math.round(done/tasks.length*100):0}}
