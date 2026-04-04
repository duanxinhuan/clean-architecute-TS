import { Controller, Post, Get } from '../../framework/decorators';
import { container } from '../../container';
import type { HeroDTO, CreateHeroDTO, CreateWeaponDTO } from '../../application/dtos/heroDto';

@Controller('/heroes')
export class HeroController {
  private service = container.resolve<import('../../application/services/heroService').HeroService>('heroService');

  @Post('/')
  async create(req: { body: CreateHeroDTO }, res: any) {
    
    const request = req.body;
    if (!request || !request.name) {
      res.status(400).json({ error: 'Invalid payload: name is required' });
      return;
    }
    const response = await this.service.createHero(request);
    res.status(201).json(response);
    return;
  }

  @Get('/')
  async list(req: any, res: any) {
    const list = await this.service.getAllHeroes();
    res.json(list);
    return;
  }

  @Get('/:externalId')
  async getByExternal(req: { params: { externalId: string } }, res: any) {
    const externalId = req.params.externalId;
    const response = await this.service.getByExternalId(externalId);
    if (!response) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(response);
    return;
  }

  @Post('/:externalId/weapons')
  async appendWeapon(req: { params: { externalId: string }; body: CreateWeaponDTO }, res: any) {
    
    const externalId = req.params.externalId;
    const request = req.body;
    if (!request || !request.name) {
      res.status(400).json({ error: 'Invalid payload: name is required' });
      return;
    }
    const response = await this.service.appendWeaponByExternalId({ externalId, body: request });
    if (!response) {
      res.status(404).json({ error: 'Hero not found' });
      return;
    }
    res.json(response);
    return;
  }
}

export default HeroController;
