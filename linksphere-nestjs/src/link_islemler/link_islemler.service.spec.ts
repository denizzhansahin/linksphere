import { Test, TestingModule } from '@nestjs/testing';
import { LinkIslemlerService } from './link_islemler.service';

describe('LinkIslemlerService', () => {
  let service: LinkIslemlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkIslemlerService],
    }).compile();

    service = module.get<LinkIslemlerService>(LinkIslemlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
