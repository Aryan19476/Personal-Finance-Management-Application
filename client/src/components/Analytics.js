import React from "react";
import { Progress, Row, Col } from 'antd';

const Analytics = ({ allTransection }) => {
    const categories = [
        "salary", "tip", "project", "food", "movie", "bills", "medical", "fee", "tax"
    ];

    // total transactions
    const totalTransaction = allTransection.length || 0;
    const totalIncomeTransactions = allTransection.filter(transaction => transaction.type === 'income');
    const totalExpenseTransactions = allTransection.filter(transaction => transaction.type === 'expense');
    const totalIncomePercent = totalTransaction > 0 ? (totalIncomeTransactions.length / totalTransaction) * 100 : 0;
    const totalExpensePercent = totalTransaction > 0 ? (totalExpenseTransactions.length / totalTransaction) * 100 : 0;

    // total turnover
    const totalTurnover = allTransection.reduce((acc, transaction) => acc + transaction.amount, 0) || 0;
    const totalIncomeTurnover = totalIncomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = totalExpenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnoverPercent = totalTurnover > 0 ? (totalIncomeTurnover / totalTurnover) * 100 : 0;
    const totalExpenseTurnoverPercent = totalTurnover > 0 ? (totalExpenseTurnover / totalTurnover) * 100 : 0;

    return (
        <Row gutter={[16, 16]}>
            {/* Total Transactions Card */}
            <Col xs={24} md={12} lg={6}>
                <div className="card">
                    <div className="card-header">
                        Total Transactions: {totalTransaction}
                    </div>
                    <div className="card-body">
                        <h5 className="text-success">Income: {totalIncomeTransactions.length}</h5>
                        <h5 className="text-danger">Expense: {totalExpenseTransactions.length}</h5>
                        <div>
                            <Progress type="circle" strokeColor="green" className="mx-2" percent={totalIncomePercent.toFixed(0)} />
                            <Progress type="circle" strokeColor="red" className="mx-2" percent={totalExpensePercent.toFixed(0)} />
                        </div>
                    </div>
                </div>
            </Col>

            {/* Total Turnover Card */}
            <Col xs={24} md={12} lg={6}>
                <div className="card">
                    <div className="card-header">
                        Total Turnover: {totalTurnover}
                    </div>
                    <div className="card-body">
                        <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
                        <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
                        <div>
                            <Progress type="circle" strokeColor="green" className="mx-2" percent={totalIncomeTurnoverPercent.toFixed(0)} />
                            <Progress type="circle" strokeColor="red" className="mx-2" percent={totalExpenseTurnoverPercent.toFixed(0)} />
                        </div>
                    </div>
                </div>
            </Col>

            {/* Category-wise Income */}
            <Col xs={24} md={12} lg={6}>
                <div className="card">
                    <div className="card-header">
                        Category-wise Income
                    </div>
                    <div className="card-body">
                        {categories.map(category => {
                            const amount = allTransection
                                .filter(transaction => transaction.type === 'income' && transaction.category === category)
                                .reduce((acc, transaction) => acc + transaction.amount, 0);
                            return (
                                amount > 0 && (
                                    <div key={category}>
                                        <h5>{category}</h5>
                                        <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
            </Col>

            {/* Category-wise Expense */}
            <Col xs={24} md={12} lg={6}>
                <div className="card">
                    <div className="card-header">
                        Category-wise Expense
                    </div>
                    <div className="card-body">
                        {categories.map(category => {
                            const amount = allTransection
                                .filter(transaction => transaction.type === 'expense' && transaction.category === category)
                                .reduce((acc, transaction) => acc + transaction.amount, 0);
                            return (
                                amount > 0 && (
                                    <div key={category}>
                                        <h5>{category}</h5>
                                        <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default Analytics;
