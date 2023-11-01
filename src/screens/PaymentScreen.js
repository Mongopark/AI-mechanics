import React, { useState } from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { PaymentRequest } from '@google/react-native-make-payment';

const paymentDetails = {
  total: {
    amount: {
      currency: 'USD',
      value: '5.00',
    },
  },
};

const googlePayRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: [
          'AMEX',
          'DISCOVER',
          'INTERAC',
          'JCB',
          'MASTERCARD',
          'VISA',
        ],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'adyen',
          gatewayMerchantId: '<PSP merchant ID>',
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: '01234567890123456789',
    merchantName: 'Example Merchant',
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPrice: paymentDetails.total.amount.value,
    currencyCode: paymentDetails.total.amount.currency,
    countryCode: 'US',
  },
};

const paymentMethods = [
  {
    supportedMethods: 'google_pay',
    data: googlePayRequest,
  },
];

const paymentRequest = new PaymentRequest(paymentMethods, paymentDetails);

const PaymentScreen = () => {
  const [text, setText] = React.useState('');

  function handleResponse(response) {
    setText(response);
    console.log(response);
  }

  function checkCanMakePayment() {
    paymentRequest
      .canMakePayment()
      .then((canMakePayment) => {
        showPaymentForm()
        /*if (canMakePayment) {
          showPaymentForm();
        } else {
          handleResponse('Google Pay unavailable');
        }*/
      })
      .catch((error) => {
        handleResponse(`paymentRequest.canMakePayment() error: ${error}`);
      });
  }

  function showPaymentForm() {
    paymentRequest
      .show()
      .then((response) => {
        if (response === null) {
          handleResponse('Payment sheet cancelled');
        } else {
          handleResponse(JSON.stringify(response, null, 2));
        }
      })
      .catch((error) => {
        handleResponse(`paymentRequest.show() error: ${error}`);
      });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable onPress={checkCanMakePayment} style = {{backgroundColor: "white", padding: 10, borderRadius: 10,}}>
        <Image
          source={require("../../assets/gpay.png")}
          style={{ width: 168, height: 48, }}
          resizeMode = "contain"
        />
      </Pressable>
      <Text style="{{font-family: monospace, white-space: pre}}">{text}</Text>
    </View>
  );
}

export default PaymentScreen