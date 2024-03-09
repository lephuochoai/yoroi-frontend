//@flow
import type { Node } from 'react';
import { useCallback, useEffect, useReducer, useState } from 'react';
import type { SwapFormAction, SwapFormState } from './types';
import { StateWrap, SwapFormActionTypeValues } from './types';
import type { AssetAmount } from '../../../../components/swap/types';
import { useSwap } from '@yoroi/swap';
// import { Quantities } from '../../../../utils/quantities';
import Context from './context';
import { Quantities } from '../../../../utils/quantities';

// const PRECISION = 14;

export const defaultSwapFormState: SwapFormState = Object.freeze({
  sellQuantity: {
    isTouched: false,
    disabled: false,
    error: null,
    displayValue: '',
  },
  buyQuantity: {
    isTouched: false,
    disabled: false,
    error: null,
    displayValue: '',
  },
  sellTokenInfo: {
    tokenId: '',
  },
  buyTokenInfo: {
    tokenId: '',
  },
  selectedPool: { isTouched: false },
  limitPrice: { displayValue: '' },
  canSwap: false,
});

type Props = {|
  children: any,
|};

const numberLocale = { decimalSeparator: '.' };

export default function SwapFormProvider({ children }: Props): Node {

  const {
    orderData,
    resetState,
    buyQuantityChanged,
    sellQuantityChanged,
    switchTokens,
    resetQuantities,
  } = useSwap();

  const { quantity: buyQuantity } = orderData.amounts.buy;
  const { quantity: sellQuantity } = orderData.amounts.sell;

  const swapFormReducer = (state: SwapFormState, action: SwapFormAction) => {
    const draft = { ...state };

    switch (action.type) {
      case SwapFormActionTypeValues.ResetSwapForm:
        return { ...defaultSwapFormState };
      case SwapFormActionTypeValues.ClearSwapForm:
        return { ...state };
      case SwapFormActionTypeValues.SellTouched:
        draft.sellQuantity.isTouched = true;
        draft.sellQuantity.displayValue = '';
        draft.sellQuantity.error = null;
        draft.sellTokenInfo = action.token;
        break;
      case SwapFormActionTypeValues.BuyTouched:
        draft.buyQuantity.isTouched = true;
        draft.buyQuantity.displayValue = '';
        draft.buyQuantity.error = null;
        draft.buyTokenInfo = action.token;
        break;
      case SwapFormActionTypeValues.SwitchTouched:
        draft.sellQuantity.isTouched = state.buyQuantity.isTouched;
        draft.buyQuantity.isTouched = state.sellQuantity.isTouched;
        draft.sellQuantity.displayValue = state.buyQuantity.displayValue;
        draft.buyQuantity.displayValue = state.sellQuantity.displayValue;
        draft.buyTokenInfo = { ...state.sellTokenInfo };
        draft.sellTokenInfo = { ...state.buyTokenInfo };
        draft.sellQuantity.error = null;
        draft.buyQuantity.error = null;
        break;
      case SwapFormActionTypeValues.PoolTouched:
        draft.selectedPool.isTouched = true;
        break;
      case SwapFormActionTypeValues.PoolDefaulted:
        draft.selectedPool = defaultSwapFormState.selectedPool;
        break;
      case SwapFormActionTypeValues.CanSwapChanged:
        draft.canSwap = action.canSwap ?? false;
        break;
      case SwapFormActionTypeValues.SellInputValueChanged:
        draft.sellQuantity.displayValue = (state.sellQuantity.isTouched && action.value) || '';
        break;
      case SwapFormActionTypeValues.BuyInputValueChanged:
        draft.buyQuantity.displayValue = (state.buyQuantity.isTouched && action.value) || '';
        break;
      case SwapFormActionTypeValues.LimitPriceInputValueChanged:
        draft.limitPrice.displayValue = action.value || '';
        break;
      case SwapFormActionTypeValues.SellAmountErrorChanged:
        draft.sellQuantity.error = action.error || null;
        break;
      case SwapFormActionTypeValues.BuyAmountErrorChanged:
        draft.buyQuantity.error = action.error || null;
        break;
      default:
        throw new Error(`swapFormReducer invalid action`);
    }
    return draft;
  };

  const [swapFormState, dispatch] = useReducer(swapFormReducer, {
    ...defaultSwapFormState,
  });

  const actions = {
    sellTouched: (token?: AssetAmount) =>
      dispatch({ type: SwapFormActionTypeValues.SellTouched, token }),
    buyTouched: (token?: AssetAmount) =>
      dispatch({ type: SwapFormActionTypeValues.BuyTouched, token }),
    switchTouched: () => dispatch({ type: SwapFormActionTypeValues.SwitchTouched }),
    switchTokens: () => {
      switchTokens();
      dispatch({ type: SwapFormActionTypeValues.SwitchTouched });
    },
    poolTouched: () => dispatch({ type: SwapFormActionTypeValues.PoolTouched }),
    poolDefaulted: () => dispatch({ type: SwapFormActionTypeValues.PoolDefaulted }),
    clearSwapForm: () => {
      resetQuantities();
      dispatch({ type: SwapFormActionTypeValues.ClearSwapForm });
    },
    resetSwapForm: () => {
      clearErrors();
      resetState();
      dispatch({ type: SwapFormActionTypeValues.ResetSwapForm });
    },
    canSwapChanged: (canSwap: boolean) =>
      dispatch({ type: SwapFormActionTypeValues.CanSwapChanged, canSwap }),
    buyInputValueChanged: (value: string) =>
      dispatch({ type: SwapFormActionTypeValues.BuyInputValueChanged, value }),
    sellInputValueChanged: (value: string) =>
      dispatch({ type: SwapFormActionTypeValues.SellInputValueChanged, value }),
    limitPriceInputValueChanged: (value: string) =>
      dispatch({ type: SwapFormActionTypeValues.LimitPriceInputValueChanged, value }),
    buyAmountErrorChanged: (error: string | null) =>
      dispatch({ type: SwapFormActionTypeValues.BuyAmountErrorChanged, error }),
    sellAmountErrorChanged: (error: string | null) =>
      dispatch({ type: SwapFormActionTypeValues.SellAmountErrorChanged, error }),
  };

  // on mount
  useEffect(() => actions.resetSwapForm(), []);
  // on unmount
  useEffect(() => () => actions.resetSwapForm(), []);

  const clearErrors = useCallback(() => {
    if (swapFormState.sellQuantity.error != null) actions.sellAmountErrorChanged(null);
    if (swapFormState.buyQuantity.error != null) actions.buyAmountErrorChanged(null);
  }, [actions, swapFormState.buyQuantity.error, swapFormState.sellQuantity.error]);

  const baseSwapFieldChangeHandler = (
    tokenInfo: any,
    handler: ({| input: string, quantity: string |}) => void,
  ) => (text: string) => {
    if (tokenInfo.tokenId === '') {
      // empty input
      return;
    }
    const decimals = tokenInfo.decimals ?? 0;
    const [input, quantity] = Quantities.parseFromText(text, decimals, numberLocale);
    clearErrors();
    handler({ quantity, input: text === '' ? '' : input });
  };

  const sellUpdateHandler = ({ input, quantity }) => {
    sellQuantityChanged(quantity);
    actions.sellInputValueChanged(input);
    const sellAvailableAmount = swapFormState.sellTokenInfo.amount ?? '0';
    if (quantity !== '' && sellAvailableAmount !== '') {
      const decimals = swapFormState.sellTokenInfo.decimals ?? 0;
      const [, availableQuantity] = Quantities.parseFromText(sellAvailableAmount, decimals, numberLocale);
      if (Quantities.isGreaterThan(quantity, availableQuantity)) {
        actions.sellAmountErrorChanged('Not enough balance');
      }
    }
  };

  const buyUpdateHandler = ({ input, quantity }) => {
    buyQuantityChanged(quantity);
    actions.buyInputValueChanged(input);
  };

  const onChangeSellQuantity = useCallback(
    baseSwapFieldChangeHandler(swapFormState.sellTokenInfo, sellUpdateHandler),
    [sellQuantityChanged, actions, clearErrors],
  );

  const onChangeBuyQuantity = useCallback(
    baseSwapFieldChangeHandler(swapFormState.buyTokenInfo, buyUpdateHandler),
    [buyQuantityChanged, actions, clearErrors],
  );

  const sellFocusState = StateWrap<boolean>(useState(false));
  const buyFocusState = StateWrap<boolean>(useState(false));

  const updateSellInput = useCallback(() => {
    if (swapFormState.sellQuantity.isTouched && !sellFocusState.value) {
      const decimals = swapFormState.sellTokenInfo.decimals ?? 0;
      const formatted = Quantities.format(sellQuantity, decimals);
      sellUpdateHandler({ input: formatted, quantity: sellQuantity });
    }
  }, [sellQuantity, swapFormState.sellTokenInfo.decimals, swapFormState.sellQuantity.isTouched]);

  const updateBuyInput = useCallback(() => {
    if (swapFormState.buyQuantity.isTouched && !buyFocusState.value) {
      const decimals = swapFormState.buyTokenInfo.decimals ?? 0;
      const formatted = Quantities.format(buyQuantity, decimals);
      buyUpdateHandler({ input: formatted, quantity: buyQuantity });
    }
  }, [buyQuantity, swapFormState.buyTokenInfo.decimals, swapFormState.buyQuantity.isTouched]);

  useEffect(() => {
    updateSellInput();
  }, [sellQuantity, updateSellInput]);

  useEffect(() => {
    updateBuyInput();
  }, [buyQuantity, updateBuyInput]);

  const allActions = {
    ...actions,
    sellFocusState,
    buyFocusState,
    onChangeSellQuantity,
    onChangeBuyQuantity,
  };

  return (
    <Context.Provider value={{ state: swapFormState, actions: allActions }}>
      {children}
    </Context.Provider>
  );
}
