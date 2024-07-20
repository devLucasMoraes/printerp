import { TNfeDeCompra } from '@/schemas'
import { TAutocompleteOption, TSpringPageData } from '@/types/models'
import { BaseService } from './BaseService'

export class NfeDeCompraService extends BaseService<
  TNfeDeCompra,
  TSpringPageData<TNfeDeCompra>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super('/nfe/compra')
  }
}
