import { Test, TestingModule } from '@nestjs/testing'
import { TextboxesController } from './textboxes.controller'

describe('TextboxesController', () => {
  let controller: TextboxesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextboxesController]
    }).compile()

    controller = module.get<TextboxesController>(TextboxesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
