import { HeroController } from './api/controllers/heroController';

async function main() {
  const controller = new HeroController();

  // Lightweight mock `res` used by controllers in this example
  const res = {
    status: (_: number) => ({ json: (obj: any) => obj }),
    json: (obj: any) => obj,
  } as any;

  // Example: create a hero via DTO (controller writes to `res`)
  await controller.create({ body: { name: 'Eris', weapons: [] } }, res);

  // Example: append weapon by externalId
  await controller.appendWeapon({ params: { externalId: 'h1' }, body: { name: 'Night Blade' } }, res);
}

main().catch(err => console.error(err));
