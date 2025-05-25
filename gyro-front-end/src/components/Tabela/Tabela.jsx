import React from "react";
import PropTypes from "prop-types";
import styles from "../Tabela/Tabela.module.css";

function Tabela({ order }) {
  console.log(order, "aaaaaaaaaa");

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id Pedido</th>
            <th>Funcionário</th>
            <th>Descrição</th>
            <th>Data e hora</th>
            <th>Pagamento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.length >= 0 &&
            order.map((o, index) => (
              <tr key={o.orderId || index}>
                <td>{o.orderId}</td>
                <td>{o.employee.name}</td>
                <td className={styles.descricao} title="Produtos">
                  {o.itemsOfProducts.map((item, i) => (
                    <span key={i}>
                      {item.productQuantiy} - {item.product.name}
                      {i < o.itemsOfProducts.length - 1 && ", "}
                    </span>
                  ))}
                </td>

                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>
                  {(() => {
                    switch (o.paymentMethod) {
                      case "CREDIT_CARD":
                        return "Cartão de Crédito";
                      case "DEBIT_CARD":
                        return "Cartão de Débito";
                      case "CASH":
                        return "Dinheiro";
                      case "PIX":
                        return "PIX";
                      default:
                        return o.paymentMethod.replace(/_/g, " ");
                    }
                  })()}
                </td>
                <td>
                  R$ {o.purchaseTotal != null && o.purchaseTotal.toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;
